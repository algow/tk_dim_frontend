import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import WithModal from "../WithModal";
import { useContext, useState } from "react";
import { getRekomendasi } from "../../utils/actions";
import { NotificationContext } from "../../utils/context";
import { getNotifData, ribuanSatuan } from "../../utils/utils";


function RekomForm(props) {  
  const [currJumlah, setCurrJumlah] = useState('');
  const [rekomData, setRekomData] = useState({});
  const [kuantitas, setKuantitas] = useState(0);
  const [totalBiaya, setTotalBiaya] = useState({});

  const {onOpenMessage} = useContext(NotificationContext);

  const handleSubmit = async (event) => {
    const idBarang = props.data?.IdBarang;

    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data = {
      jumlah: fd.get('jumlah'),
      id_barang: parseInt(idBarang)
    };

    try {
      const rekomendasi = await getRekomendasi(data);

      if(rekomendasi.error === false) {
        setRekomData(rekomendasi);
        setTotalBiaya(rekomendasi.data?.biaya);
        setKuantitas(rekomendasi.data?.kuantitas);
      } else {
        onOpenMessage(getNotifData(7));
      }
    } catch (error) {
      onOpenMessage(getNotifData(3));
    }
  };

  const handleChange = (e) => {
    setCurrJumlah(e.target.value);
  };

  return(
    <Grid container direction="row">
      <Grid container>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="jumlah"
            label="Jumlah Pembelian"
            name="jumlah"
            type="number"
            autoComplete="jumlah"
            value={currJumlah}
            autoFocus
            onChange={(event) => handleChange(event)}
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Submit
            </Button>
        </Box>
      </Grid>

      <Grid container>
        {
          (Object.keys(rekomData).length > 0 )
          ?
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">Nama Supplier</TableCell>
                  <TableCell align="center">Harga Satuan</TableCell>
                  <TableCell align="center">Diskon</TableCell>
                  <TableCell align="center">Minimal Pembelian</TableCell>
                  <TableCell align="center">Maksimal Pembelian</TableCell>
                  <TableCell align="center">Jumlah Beli</TableCell>
                  <TableCell align="center">Biaya</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rekomData.data.toko.map((rekom, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{i+1}</TableCell>
                    <TableCell align="left">{rekom.toko}</TableCell>
                    <TableCell align="right">{ribuanSatuan(rekom.harga)}</TableCell>
                    <TableCell align="right">{rekom.diskon}</TableCell>
                    <TableCell align="right">{rekom.min_pembelian}</TableCell>
                    <TableCell align="right">{rekom.max_pembelian}</TableCell>
                    <TableCell align="right">{rekom.jumlah_beli}</TableCell>
                    <TableCell align="right">{ribuanSatuan(rekom.biaya)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell align="center" colSpan={6}>TOTAL</TableCell>
                  <TableCell align="right">{ribuanSatuan(kuantitas)}</TableCell>
                  <TableCell align="right">{ribuanSatuan(totalBiaya)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          :
          null
        }
      </Grid>
    </Grid>
  );
}

export default WithModal(RekomForm);