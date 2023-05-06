import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getStok} from '../utils/actions';
import { getNotifData, ribuanSatuan } from '../utils/utils';
import { Button, Dialog, DialogActions, DialogTitle, Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NotificationContext } from '../utils/context';
import { useNavigate } from 'react-router-dom';



export default function Dashboard() {
  const {onOpenMessage} = useContext(NotificationContext);

  const [stokList, setStokList] = useState([]);
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

    stok().catch(err => {
      if(err.response?.status === 403) {
        onOpenMessage(getNotifData(8));
      } else {
        onOpenMessage(getNotifData(3));
      }

      navigate('/');
    });
  }, []);


  return (
    <>
      <Grid container direction="column">
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

      

    </>
  )
}