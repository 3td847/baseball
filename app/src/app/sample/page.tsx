"use client";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Link,
  Snackbar,
  Stack,
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function Page() {
  const theme = useTheme();

  const [tab, setTab] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(true);
  const [name, setName] = React.useState("");

  const paletteSnapshot = {
    mode: theme.palette.mode,
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary?.main,
    backgroundDefault: theme.palette.background.default,
    textPrimary: theme.palette.text.primary,
  } as const;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={4}>
        {/* Header */}
        <Stack spacing={1}>
          <Typography variant="h3" fontWeight={700}>
            MUI セットアップ確認ページ
          </Typography>
          <Typography color="text.secondary">
            layout.tsx と theme.ts の設定が正しく効いているかを簡単に検証します。
          </Typography>
        </Stack>

        {/* Theme snapshot */}
        <Card elevation={3}>
          <CardHeader title="Theme Snapshot" subheader="ThemeProvider / palette 反映の確認" />
          <CardContent>
            <Stack spacing={2}>
              <Typography component="pre" sx={{ m: 0, p: 2, bgcolor: "action.hover", borderRadius: 2 }}>
                {JSON.stringify(paletteSnapshot, null, 2)}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Box sx={{ width: 48, height: 24, borderRadius: 1, bgcolor: "primary.main" }} />
                <Box sx={{ width: 48, height: 24, borderRadius: 1, bgcolor: "secondary.main" }} />
                <Box sx={{ width: 48, height: 24, borderRadius: 1, bgcolor: "background.default", border: 1, borderColor: "divider" }} />
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Responsive / sx check */}
        <Card elevation={3}>
          <CardHeader title="Responsive Box" subheader="breakpoints と sx の挙動確認" />
          <CardContent>
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "primary.light",
                color: "primary.contrastText",
                width: { xs: "100%", sm: 420, md: 560 },
              }}
            >
              <Typography variant="body2">
                画面幅に応じてこの Box の幅が変わります（xs: 100%, sm: 420px, md: 560px）。
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Interactive components */}
        <Card elevation={3}>
          <CardHeader title="Interactive Components" subheader="クライアントコンポーネントの確認" />
          <CardContent>
            <Stack spacing={3}>
              <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="sample tabs">
                <Tab label="フォーム" />
                <Tab label="ボタン" />
                <Tab label="その他" />
              </Tabs>
              <Divider />

              {tab === 0 && (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="Your name"
                    placeholder="山田 太郎"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    helperText="TextField のスタイルとフォントを確認"
                    fullWidth
                  />
                  <FormControlLabel
                    control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
                    label={checked ? "ON" : "OFF"}
                  />
                </Stack>
              )}

              {tab === 1 && (
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={() => setOpen(true)}>
                    contained（Snackbar 表示）
                  </Button>
                  <Button variant="outlined">outlined</Button>
                  <Button variant="text">text</Button>
                </Stack>
              )}

              {tab === 2 && (
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography gutterBottom>
                    MUI の <code>Link</code> コンポーネント（外部へ）
                  </Typography>
                  <Link href="https://mui.com/" target="_blank" rel="noopener noreferrer">
                    MUI ドキュメントを開く
                  </Link>
                </Paper>
              )}
            </Stack>
          </CardContent>
        </Card>

        <Snackbar
          open={open}
          autoHideDuration={2200}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setOpen(false)} severity="success" variant="filled" sx={{ width: "100%" }}>
            MUI セットアップ成功！（Snackbar 実行中）
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  );
}
