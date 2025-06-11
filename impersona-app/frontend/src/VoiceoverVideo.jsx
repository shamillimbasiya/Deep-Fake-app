import React from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import { getReadableFileSizeString } from "./utils";
import Hero from "./Hero";
import GeneratedVideoModal from "./GeneratedVideoModal";

const StyledBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  width: 300,
  aspectRatio: 4 / 3,
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    width: 400,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function VoiceoverVideo() {
  const theme = useTheme();

  const [openModal, setOpenModal] = React.useState(false);
  const [generatedVideo, setGeneratedVideo] = React.useState(null);

  const [video, setVideo] = React.useState(null);
  const [videoFile, setVideoFile] = React.useState(null);
  const [audioFile, setAudioFile] = React.useState(null);
  const [prompt, setPrompt] = React.useState("");

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setVideo(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setVideo(null);
      setVideoFile(null);
    }
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "audio/wav" || file.type === "audio/x-wav")) {
      setAudioFile(file);
    } else {
      setAudioFile(null);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPrompt(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(true);
    // Submit form logic here
    const formData = new FormData();
    formData.append("audioFile", audioFile); 
    formData.append("videoFile", videoFile); 
    formData.append("prompt", prompt);
    console.log("Form submitted:", formData);

    try {
      const response = await fetch("http://127.0.0.1:5000/generate", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const videoUrl = URL.createObjectURL(blob);
        setGeneratedVideo(videoUrl);
        
        console.log("Upload successful");
      } else {
        //const data = await response.json();
        setGeneratedVideo("error");
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
    // Perform HTTP Post request here below...
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setGeneratedVideo(null); // Added this to get the loading screen each time
  };

  const handleDownloadVideo = () => {
    //const videoUrl = URL.createObjectURL(generatedVideo);

    const link = document.createElement("a");
    link.href = generatedVideo; // Was videoUrl before
    link.download = "impersonate-video";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Hero
        title="AI-Driven Voiceover&nbsp;"
        titleHighlight="Video"
        description="Any video, any voice, and your own words — seamlessly blended with AI."
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack
            direction="row"
            spacing={8}
            useFlexGap
            sx={{
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2}>
              <StyledBox id="video">
                {video ? (
                  <video
                    src={video}
                    alt="Preview"
                    controls
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      borderRadius: theme.shape.borderRadius / 2,
                    }}
                  />
                ) : (
                  <Stack
                    spacing={2}
                    useFlexGap
                    sx={{
                      alignItems: "center",
                      width: { xs: "100%", sm: "70%" },
                    }}
                  >
                    <input
                      accept=".mp4"
                      style={{ display: "none" }}
                      id="upload-video-button"
                      type="file"
                      onChange={handleVideoUpload}
                    />
                    <label htmlFor="upload-video-button">
                      <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        startIcon={<FileUploadIcon />}
                        component="span"
                      >
                        Upload&nbsp;video
                      </Button>
                    </label>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "center",
                        color: "text.secondary",
                      }}
                    >
                      No&nbsp;video&nbsp;selected
                    </Typography>
                  </Stack>
                )}
              </StyledBox>
              <Stack
                direction="row"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  visibility: video === null ? "hidden" : "visible",
                  p: 1,
                  color: "inherit",
                  borderColor: "hsla(220, 25%, 25%, 0.3)",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Typography>{videoFile?.name}</Typography>
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
                    {getReadableFileSizeString(videoFile?.size, true, 1)}
                  </Typography>
                </div>
                <IconButton
                  onClick={() => {
                    setVideo(null);
                    setVideoFile(null);
                  }}
                >
                  <DeleteOutlinedIcon />
                </IconButton>
              </Stack>
            </Stack>
            <Stack
              spacing={4}
              sx={{
                alignItems: "start",
                width: 300,
                [theme.breakpoints.up("sm")]: {
                  width: 400,
                },
                mb: 15,
              }}
            >
              <Stack
                sx={{
                  width: "100%",
                  alignItems: "start",
                }}
              >
                <FormLabel htmlFor="speech-prompt-text-field">
                  Target&nbsp;Voice*
                </FormLabel>
                <Stack
                  direction="row"
                  component={Card}
                  useFlexGap
                  sx={{
                    height: 60,
                    width: "100%",
                    borderColor: "hsla(220, 25%, 25%, 0.3)",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {audioFile === null ? (
                    <div>
                      <input
                        accept=".wav"
                        style={{ display: "none" }}
                        id="upload-audio-button"
                        type="file"
                        onChange={handleAudioUpload}
                      />
                      <label htmlFor="upload-audio-button">
                        <Button
                          variant="outlined"
                          color="info"
                          size="small"
                          startIcon={<FileUploadIcon />}
                          component="span"
                        >
                          Upload&nbsp;audio
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                        }}
                      >
                        <Typography>{audioFile?.name}</Typography>
                        <Typography variant="body2" sx={{ color: "grey.400" }}>
                          {getReadableFileSizeString(audioFile?.size, true, 1)}
                        </Typography>
                      </div>
                      <IconButton
                        onClick={() => {
                          setAudioFile(null);
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </div>
                  )}
                </Stack>
              </Stack>
              <Stack
                sx={{
                  width: "100%",
                  alignItems: "start",
                }}
              >
                <FormLabel htmlFor="speech-prompt-text-field">
                  Speech&nbsp;Prompt*
                </FormLabel>
                <TextField
                  id="speech-prompt-text-field"
                  required
                  multiline
                  fullWidth
                  rows={6}
                  variant="outlined"
                  placeholder="Say this..."
                  slotProps={{
                    htmlInput: { maxLength: 400 },
                  }}
                  value={prompt}
                  onChange={handleChange}
                />
              </Stack>
            </Stack>
          </Stack>
          <Box sx={{ mb: 8 }}>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              disabled={
                videoFile === null || audioFile === null || prompt === ""
              }
            >
              Generate&nbsp;Video
            </Button>
          </Box>
        </form>
      </Container>
      <GeneratedVideoModal
        open={openModal}
        onClose={handleModalClose}
        video={generatedVideo}
        onDownload={handleDownloadVideo}
      />
    </div>
  );
}
