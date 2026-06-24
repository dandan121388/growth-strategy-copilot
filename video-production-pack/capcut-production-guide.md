# CapCut Production Guide

Use this workflow to create an AI-narrated product demo without recording a personal voice or face.

## 1. Record the Screen Walkthrough

1. Open the production app: <https://growth-strategy-copilot.vercel.app>
2. Click **Reset Demo** to start from a clean state.
3. Use English mode first.
4. Click **Start Demo with Fitness Sample**.
5. Record the main flow: Dashboard, Diagnosis, Segmentation, Strategy, Experiments, Report, and English / Chinese switch.
6. Keep the screen recording between 2 and 3 minutes if possible.

## 2. Import into CapCut

1. Create a new CapCut project.
2. Import the screen recording.
3. Trim dead time at the beginning and end.
4. Remove accidental pauses or fast scroll sections.

## 3. Add AI Voiceover

1. Open **Text to Speech**.
2. Paste either `full-demo-script-en.md` or `full-demo-script-zh.md`.
3. Choose a professional, calm AI voice.
4. Generate the voiceover.
5. Align the voiceover with screen actions.

Recommended voice style:

- English: clear business narration, medium pace.
- Chinese: formal product narration, medium pace.

## 4. Generate Subtitles

1. Use CapCut auto captions, or import the provided SRT file.
2. English subtitles: `subtitles-en.srt`.
3. Chinese subtitles: `subtitles-zh.srt`.
4. Keep subtitles at the bottom center.
5. Use high contrast and avoid covering key UI.

## 5. Add On-Screen Captions

1. Use captions from `on-screen-captions.md`.
2. Add one overlay per scene.
3. Keep overlays short and minimal.
4. Use consistent typography and spacing.

## 6. Trim to Final Length

- Full demo: 2-3 minutes.
- Short version: 45-60 seconds.
- Avoid long idle periods.
- Pause slightly on Diagnosis, Strategy, Experiments, and Report.

## 7. Recommended Export Settings

- Format: MP4
- Resolution: 1920 x 1080
- Frame rate: 30 fps
- Bitrate: 8-12 Mbps
- Audio: AAC, 44.1 kHz or 48 kHz
- Filename example: `growth-strategy-copilot-demo-en.mp4`

## 8. Optional 60-Second Version

1. Duplicate the project.
2. Replace the script with `short-demo-script-en.md` or `short-demo-script-zh.md`.
3. Keep only the strongest scenes: opening, diagnosis, strategy, experiments, report.
4. Export a 45-60 second preview for LinkedIn or portfolio pages.
