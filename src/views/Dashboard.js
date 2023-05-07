import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getLaba, getStok} from '../utils/actions';
import { getNotifData, ribuanSatuan } from '../utils/utils';
import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { NotificationContext } from '../utils/context';
import { useNavigate } from 'react-router-dom';



export default function Dashboard() {
  const {onOpenMessage} = useContext(NotificationContext);

  const initialTotal = {
    hpp: 0,
    bruto: 0,
    keuntungan: 0,
  }

  const [stokList, setStokList] = useState([]);
  const [labaRugiList, setLabaRugiList] = useState([]);
  const [labaRugiTotal, setLabaRugiTotal] = useState(initialTotal);

  const navigate = useNavigate();

  useEffect(() => {
    async function stok() {
      const data = await getStok();

      if(data.error) {
        onOpenMessage(getNotifData(7));
      } else {
        setStokList(data.data);
      }  
    }

    async function labaRugi() {
      const data = await getLaba();

      if(data.error) {
        onOpenMessage(getNotifData(7));
      } else {
        setLabaRugiList(data.data);

        const total = {
          hpp: 0,
          bruto: 0,
          keuntungan: 0,      
        };

        data.data.forEach(laba => {
          total.hpp += parseInt(laba?.Nilai_HPP);
          total.bruto += parseInt(laba?.NilaiPenjualanBruto);
          total.keuntungan += parseInt(laba?.Keuntungan);  
        });

        setLabaRugiTotal(total);
      }  
    }

    stok().catch(err => {
      if(err.response?.status === 403) {
        onOpenMessage(getNotifData(8));
      } else {
        onOpenMessage(getNotifData(3));
      }

      navigate('/');
    });

    labaRugi().catch(err => {
      if(err.response?.status === 403) {
        onOpenMessage(getNotifData(8));
      } else {
        onOpenMessage(getNotifData(3));
      }

      navigate('/');
    });
  }, [navigate, onOpenMessage]);


  return (
    <>
      <Grid container direction="row">
        {/* Tabel Stok */}
        <Grid container direction="column" sx={{ mt: 3 }}>
          <Grid container sx={{ mb: 1 }}>
            <Typography gutterBottom variant="h4" component="h2">
              Daftar Stok
            </Typography>
          </Grid>
          
          <Divider variant="middle" />

          <Grid container spacing={4} sx={{ mt: 1 }}>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No.</TableCell>
                    <TableCell align="center">Nama Barang</TableCell>
                    <TableCell align="center">Satuan</TableCell>
                    <TableCell align="center">Jumlah Pembelian</TableCell>
                    <TableCell align="center">Jumlah Penjualan</TableCell>
                    <TableCell align="center">Stok</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stokList.map((stok, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{i+1}</TableCell>
                      <TableCell align="left">{stok.NamaBarang}</TableCell>
                      <TableCell align="left">{stok.Satuan}</TableCell>
                      <TableCell align="right">{stok.JumlahPembelian}</TableCell>
                      <TableCell align="right">{stok.JumlahPenjualan}</TableCell>
                      <TableCell align="right">{stok.Stok}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

        {/* Tabel Laba rugi */}
        <Grid container direction="column" sx={{ mt: 5 }}>
          <Grid container sx={{ mb: 1 }}>
            <Typography gutterBottom variant="h4" component="h2">
              Laporan Laba Rugi
            </Typography>
          </Grid>
          
          <Divider variant="middle" />

          <Grid container spacing={4} sx={{ mt: 1 }}>
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">No.</TableCell>
                    <TableCell align="center">Nama Barang</TableCell>
                    <TableCell align="center">Satuan</TableCell>
                    <TableCell align="center">Jml. Item Terjual</TableCell>
                    <TableCell align="center">Harga Satuan Beli</TableCell>
                    <TableCell align="center">Harga Satuan Jual</TableCell>
                    <TableCell align="center">Harga Pokok Penjualan</TableCell>
                    <TableCell align="center">Nilai Penjualan Bruto</TableCell>
                    <TableCell align="center">Keuntungan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {labaRugiList.map((labaRugi, i) => (
                    <TableRow
                      key={i}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="right">{i+1}</TableCell>
                      <TableCell align="left">{labaRugi.NamaBarang}</TableCell>
                      <TableCell align="left">{labaRugi.Satuan}</TableCell>
                      <TableCell align="right">{labaRugi.ItemTerjual}</TableCell>
                      <TableCell align="right">{ribuanSatuan(parseInt(labaRugi.HargaBeli))}</TableCell>
                      <TableCell align="right">{ribuanSatuan(parseInt(labaRugi.HargaJual))}</TableCell>
                      <TableCell align="right">{ribuanSatuan(parseInt(labaRugi.Nilai_HPP))}</TableCell>
                      <TableCell align="right">{ribuanSatuan(parseInt(labaRugi.NilaiPenjualanBruto))}</TableCell>
                      <TableCell align="right">{ribuanSatuan(parseInt(labaRugi.Keuntungan))}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={6} align="center">TOTAL</TableCell>
                    <TableCell align="right">{ribuanSatuan(labaRugiTotal.hpp)}</TableCell>
                    <TableCell align="right">{ribuanSatuan(labaRugiTotal.bruto)}</TableCell>
                    <TableCell align="right">{ribuanSatuan(labaRugiTotal.keuntungan)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

      </Grid>
    </>
  )
}