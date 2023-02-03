import { Button, Grid } from "@mui/material";
import { GetServerSideProps } from "next";
import Link from "next/link";

export default function AdminPage() {
  return (
    <Grid container>
      <Button LinkComponent={Link} sx={{ color: "primary" }} href="/admin/series">
        Séries
      </Button>
      <Button LinkComponent={Link} sx={{ color: "primary" }} href="/admin/players">
        Atletas
      </Button>
    </Grid>
  );
}
