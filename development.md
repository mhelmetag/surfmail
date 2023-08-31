# Development Notes

## Rough Draft

Rough steps:

- Fetch surf forecast for the day
- Feed surf forecast facts and other prompt info to ChatGPT
- Send ChatGPT output to ElevenLabs
- Upload ElevenLabs recording to Twilio Assets
- Play recording when Twilio number is called

Prompt:

```
Surf Spot: Ventura Point, CA
Surf Height: 2-3ft
Dominant Swell: 1.4ft 13s SSW
Wind: 5mph onshore
Tide: 5ft
Water Temp: 61F

Given these surf conditions, write a surf report in the style of an old surf shop voicemail surf report.

Fully write out any abbreviations, directions or units.

Keep it short.

Introduce yourself as Steve Wavestorm.
```

## S3

- Upload to S3

## Auto Refresh

- Cron to refresh daily AM report for Ventura Point
