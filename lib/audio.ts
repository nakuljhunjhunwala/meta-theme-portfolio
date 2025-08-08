import { Howler, Howl } from "howler"

// Cached tone generator using Howler and base64 WAV data URIs.
// Also exposes unlock helpers to satisfy mobile autoplay policies.

type WaveType = "square" | "sine" | "triangle" | "sawtooth"

const toneCache = new Map<string, Howl>()

export function playTone(
    frequency: number = 440,
    durationMs: number = 120,
    volume: number = 0.05,
    wave: WaveType = "square"
): void {
    try {
        const key = `${wave}:${frequency}:${durationMs}`
        let sound = toneCache.get(key)
        if (!sound) {
            const dataUri = buildToneDataURI(frequency, durationMs, wave)
            sound = new Howl({ src: [dataUri], volume })
            toneCache.set(key, sound)
        } else {
            sound.volume(volume)
        }
        sound.play()
    } catch {
        // ignore
    }
}

export function unlockAudio(): void {
    try {
        // Resume WebAudio context if suspended
        // @ts-ignore Howler ctx type
        const ctx: AudioContext | undefined = Howler.ctx
        if (ctx && ctx.state === "suspended") {
            ctx.resume().catch(() => { })
        }
        // Play a short silent buffer to fully unlock on iOS
        const silent = buildToneDataURI(440, 1, "sine")
        const h = new Howl({ src: [silent], volume: 0 })
        h.play()
        setTimeout(() => h.unload(), 50)
    } catch { }
}

let attached = false
export function attachGlobalAudioUnlock(): void {
    if (attached) return
    attached = true
    const handler = () => {
        unlockAudio()
        window.removeEventListener("pointerdown", handler)
        window.removeEventListener("touchstart", handler)
        window.removeEventListener("keydown", handler)
    }
    window.addEventListener("pointerdown", handler, { passive: true })
    window.addEventListener("touchstart", handler, { passive: true })
    window.addEventListener("keydown", handler)
}

function buildToneDataURI(frequency: number, durationMs: number, wave: WaveType): string {
    const sampleRate = 22050
    const numSamples = Math.max(1, Math.floor((sampleRate * durationMs) / 1000))
    const bytesPerSample = 2
    const headerSize = 44
    const dataSize = numSamples * bytesPerSample
    const buffer = new ArrayBuffer(headerSize + dataSize)
    const view = new DataView(buffer)

    writeAscii(view, 0, "RIFF")
    view.setUint32(4, 36 + dataSize, true)
    writeAscii(view, 8, "WAVE")
    writeAscii(view, 12, "fmt ")
    view.setUint32(16, 16, true)
    view.setUint16(20, 1, true)
    view.setUint16(22, 1, true)
    view.setUint32(24, sampleRate, true)
    view.setUint32(28, sampleRate * bytesPerSample, true)
    view.setUint16(32, bytesPerSample, true)
    view.setUint16(34, 16, true)
    writeAscii(view, 36, "data")
    view.setUint32(40, dataSize, true)

    const amplitude = 0.9
    let phase = 0
    const phaseInc = (2 * Math.PI * frequency) / sampleRate
    for (let i = 0; i < numSamples; i++) {
        phase += phaseInc
        let sample = 0
        if (wave === "square") {
            sample = Math.sign(Math.sin(phase)) * amplitude
        } else if (wave === "sine") {
            sample = Math.sin(phase) * amplitude
        } else if (wave === "triangle") {
            sample = (2 / Math.PI) * amplitude * Math.asin(Math.sin(phase))
        } else if (wave === "sawtooth") {
            sample = (2 * amplitude) / Math.PI * (phase - Math.PI / 2)
        }
        view.setInt16(headerSize + i * 2, Math.max(-1, Math.min(1, sample)) * 0x7fff, true)
    }

    // Convert to base64 data URI
    const bytes = new Uint8Array(buffer)
    let binary = ""
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i])
    const base64 = btoa(binary)
    return `data:audio/wav;base64,${base64}`
}

function writeAscii(view: DataView, offset: number, str: string) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
}

