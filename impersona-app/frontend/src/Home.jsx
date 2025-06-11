import React from "react";
import Hero from "./Hero";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <div>
      <Hero
        title="Welcome&nbsp;to&nbsp;"
        titleHighlight="Impersona"
        description="Create&nbsp;personalized&nbsp;video&nbsp;content&nbsp;with&nbsp;deepfake&nbsp;technology."
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={5}>
          <Stack
            spacing={1}
            sx={{
              width: "fit-content",
            }}
          >
            {/* Voiceover Video explanation */}
            <Typography
              variant="h2"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "start",
              }}
            >
              Voiceover Video
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "start",
                color: "text.secondary",
                width: "100%",
              }}
            >
              Transform videos by making someone speak in a different voice and
              saying custom words.
            </Typography>
            <ol
              style={{
                textAlign: "start",
                color: "text.secondary",
                width: "100%",
              }}
            >
              <Stack spacing={2}>
                <div>
                  <Typography variant="h6" color="text.primary">
                    <li>Upload a Video:</li>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Upload a video of a person speaking. Ensure it's clear and
                    has good quality.
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="text.primary">
                    <li>Upload a Voice Clip:</li>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Add an audio file of the desired voice to use for the
                    transformation.
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="text.primary">
                    <li>Enter a Text Prompt:</li>
                    <Typography variant="body1" color="text.secondary">
                      Write the words you want the person in the video to say.
                    </Typography>
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="text.primary">
                    <li>Click Generate:</li>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Press the button, and let our AI create a new video where
                    the person in your uploaded video speaks the text in the
                    uploaded voice.
                  </Typography>
                </div>
              </Stack>
            </ol>
          </Stack>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Stack
            spacing={1}
            sx={{
              width: "fit-content",
            }}
          >
            {/* Face Reenactment explanation */}
            <Typography
              variant="h2"
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
              }}
            >
              Face Reenactment
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                textAlign: "start",
                color: "text.secondary",
                width: "100%",
              }}
            >
              Bring a photo to life by syncing it with video speech and a custom
              voice.
            </Typography>
            <ol
              style={{
                textAlign: "start",
                color: "text.secondary",
                width: "100%",
              }}
            >
              <Stack spacing={2}>
                <div>
                  <Typography variant="h6" color="text.primary">
                    <li>Upload a Video:</li>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Provide a video of someone speaking. This will guide the
                    movement and lip-sync of the final video.
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="text.primary">
                    <li>Upload a Photo:</li>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Add an image of the person you want to animate.
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="text.primary">
                    <li>Select a Voice:</li>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Choose from a list of pre-determined voices to use in the
                    final video.
                  </Typography>
                </div>
                <div>
                  <Typography variant="h6" color="text.primary">
                    <li>Click Generate:</li>
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Hit the button, and our AI will create a video where the
                    person in the image speaks the words from the video in the
                    selected voice.
                  </Typography>
                </div>
              </Stack>
            </ol>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
