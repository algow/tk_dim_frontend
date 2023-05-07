import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getPenjualan } from '../utils/actions';
import { getNotifData, ribuanSatuan } from '../utils/utils';
import { Button, Dialog, DialogActions, DialogTitle, Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NotificationContext } from '../utils/context';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PenjualanForm from '../components/forms/PenjualanForm';


export default function Penjualan() {
  const {onOpenMessage} = useContext(NotificationContext);

  const [penjualanList, setPenjualanList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function penjualan() {
      const data = await getPenjualan();

      if(data.error) {
        onOpenMessage(getNotifData(7));
      } else {
        setPenjualanList(data.data);
      }  
    }

    penjualan().catch(err => {
      if(err.response?.status === 403) {
        onOpenMessage(getNotifData(8));
      } else {
        onOpenMessage(getNotifData(3));
      }

      navigate('/');
    });
  }, []);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPenjualan, setSelectedPenjualan] = useState({});
  const [modalTitle, setModalTitle] = useState('');
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenEdit = (data) => {
    setOpenEdit(true);
    setSelectedPenjualan(data);

    setModalTitle('Ubah penjualan ' + data.NamaBarang);
  };
  const handleCloseEdit = () => setOpenEdit(false);


  return (
    <>
      <Grid container direction="column">
        <Grid container sx={{ mb: 1 }}>
          <Typography gutterBottom variant="h4" component="h2">
            Daftar Penjualan
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
                  <TableCell align="center">Nama Pelanggan</TableCell>
                  <TableCell align="center">Dijual Oleh</TableCell>
                  <TableCell align="center">Dijual Pada</TableCell>
                  <TableCell align="center">Satuan</TableCell>
                  <TableCell align="center">Jumlah Penjualan</TableCell>
                  <TableCell align="center">Harga Satuan</TableCell>
                  <TableCell align="center">Nilai Penjualan</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {penjualanList.map((penjualan, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{i+1}</TableCell>
                    <TableCell align="left">{penjualan.NamaBarang}</TableCell>
                    <TableCell align="left">{penjualan.NamaPelanggan}</TableCell>
                    <TableCell align="left">{penjualan.NamaPengguna}</TableCell>
                    <TableCell align="left">{penjualan.DijualPada}</TableCell>
                    <TableCell align="left">{penjualan.Satuan}</TableCell>
                    <TableCell align="right">{penjualan.JumlahPenjualan}</TableCell>
                    <TableCell align="right">{ribuanSatuan(penjualan.HargaJual)}</TableCell>
                    <TableCell align="right">{ribuanSatuan(penjualan.NilaiPenjualan)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <PenjualanForm   
        type='update'
        open={openEdit} 
        onClose={handleCloseEdit} 
        modalContent={selectedPenjualan} 
        title={modalTitle} 
      />

      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Apakah anda yakin akan menghapus record ini?
        </DialogTitle>
        <DialogActions>
          <Button 
            variant="outlined"
            onClick={() => console.log(1234)}
          >
            Hapus
          </Button>
          <Button 
            onClick={handleCloseDelete}
            variant="contained"
          >
            Batal
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}