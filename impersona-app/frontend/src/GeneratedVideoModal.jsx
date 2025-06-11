import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, useTheme } from "@mui/material/styles";

export default function GeneratedVideoModal({
  open,
  onClose,
  video,
  onDownload,
}) {
  const theme = useTheme();

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

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Box
          component={Card}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "2px solid #000",
            borderColor: "hsla(220, 25%, 25%, 0.3)",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack
            spacing={4}
            sx={{
              alignItems: "center",
            }}
          >
            <Stack
              direction="row"
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography id="modal-modal-title" variant="h4" component="h2">
                AI-Generated Video
              </Typography>
              <IconButton size="small" onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <StyledBox>
              {video ? (
                <video
                  src={video}
                  alt="AI Generated Video"
                  controls
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    borderRadius: theme.shape.borderRadius / 2,
                  }}
                />
              ) : (
                <CircularProgress />
              )}
            </StyledBox>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ width: "fit-content" }}
              disabled={video === null ? true : false}
              onClick={onDownload}
            >
              Download&nbsp;Video
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
