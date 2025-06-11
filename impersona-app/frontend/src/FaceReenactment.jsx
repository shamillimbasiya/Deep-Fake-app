import React from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { getReadableFileSizeString } from "./utils";
import Hero from "./Hero";
import VoiceDropDown from "./VoiceDropDown";
import GeneratedVideoModal from "./GeneratedVideoModal";

const StyledBox = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  width: 225,
  aspectRatio: 4 / 3,
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    width: 300,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function FaceReenactment() {
  const theme = useTheme();

  const [openModal, setOpenModal] = React.useState(false);
  const [generatedVideo, setGeneratedVideo] = React.useState(null);

  const [imagePreview, setImagePreview] = React.useState(null);
  const [imagePreviewType, setImagePreviewType] = React.useState(null);
  const [imageFile, setImageFile] = React.useState(null);
  const [videoPreview, setVideoPreview] = React.useState(null);
  const [videoFile, setVideoFile] = React.useState(null);
  const [voice, setVoice] = React.useState(null);

  const handleVoiceChange = (value) => {
    setVoice(value);
  };



  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/") || file.type === "video/mp4") {
        const fileType = file.type.startsWith("image/") ? "image" : "video";
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result); // Use the existing state for both image and video previews
          setImagePreviewType(fileType); // Set the type of preview (image or video)
        };
        reader.readAsDataURL(file);
      } else {
        // Reset if the file is unsupported
        setImagePreview(null);
        setImagePreviewType(null);
        setImageFile(null);
      }
    }
  };

  /*
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if ((file && file.type === "image/jpeg") || (file && file.type === "video/mp4")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };*/

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "video/mp4") {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setVideoPreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setVideoPreview(null);
      setVideoFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenModal(true);
    // Submit form logic here
    //const formData = {
    //  imageFile: imageFile,
    //  videoFile: videoFile,
    //};
    const formData = new FormData();
    formData.append("imageFile", imageFile);  // imageFile is the image you want to upload
    formData.append("videoFile", videoFile);  // videoFile is the video you want to upload
    formData.append("voice", voice);          // voice is the voice model you want to use

    console.log("Form submitted:", formData);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
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
        title="Face&nbsp;"
        titleHighlight="Reenactment"
        description="Transform&nbsp;your&nbsp;video&nbsp;into&nbsp;a&nbsp;new&nbsp;persona."
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack sx={{ alignItems: "center", justifyContent: "center" }}>
            <Stack sx={{ marginTop: 0, marginBottom: 6, alignItems: "start" }}>
              <FormLabel htmlFor="voice-dropdown">Target&nbsp;Voice*</FormLabel>
              <VoiceDropDown
                id="voice-dropdown"
                onChange={handleVoiceChange}
                currentValue={voice}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={8}
              useFlexGap
              sx={{
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Stack spacing={2}>
                <StyledBox id="image">
                {imagePreview ? (
                      imagePreviewType === "image" ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            borderRadius: theme.shape.borderRadius / 2,
                          }}
                        />
                      ) : (
                        <video
                          src={imagePreview}
                          controls
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            borderRadius: theme.shape.borderRadius / 2,
                          }}
                        />
                      )
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
                        id="upload-image-button"
                        type="file"
                        accept=".jpg, .mp4"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="upload-image-button">
                        <Button
                          variant="outlined"
                          color="info"
                          size="small"
                          startIcon={<FileUploadIcon />}
                          component="span"
                        >
                          Upload&nbsp;source&nbsp;image/video
                        </Button>
                      </label>
                      <Typography
                        variant="body1"
                        sx={{
                          textAlign: "center",
                          color: "text.secondary",
                        }}
                      >
                        No&nbsp;image/video&nbsp;selected
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
                    visibility: imagePreview == null ? "hidden" : "visible",
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
                    <Typography>{imageFile?.name}</Typography>
                    <Typography variant="body2" sx={{ color: "grey.400" }}>
                      {getReadableFileSizeString(imageFile?.size, true, 1)}
                    </Typography>
                  </div>
                  <IconButton
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Stack>
              </Stack>
              {/* ---------------------------------------- */}
              <Stack spacing={2}>
                <StyledBox id="video">
                  {videoPreview ? (
                    <video
                      src={videoPreview}
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
                        id="upload-video-button"
                        type="file"
                        accept=".mp4"
                        onChange={handleVideoUpload}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="upload-video-button">
                        <Button
                          variant="outlined"
                          color="info"
                          size="small"
                          startIcon={<FileUploadIcon />}
                          component="span"
                        >
                          Upload&nbsp;driving&nbsp;video
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
                    visibility: videoPreview == null ? "hidden" : "visible",
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
                      setVideoFile(null);
                      setVideoPreview(null);
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Box sx={{ p: 4 }}>
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              disabled={
                imageFile === null || videoFile === null || voice === null
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
