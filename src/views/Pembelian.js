import { useContext, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { deletePembelian, getPembelian } from '../utils/actions';
import { getNotifData, ribuanSatuan } from '../utils/utils';
import { Button, Dialog, DialogActions, DialogTitle, Divider, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NotificationContext } from '../utils/context';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PembelianForm from '../components/forms/PembelianForm';


export default function Pembelian() {
  const {onOpenMessage} = useContext(NotificationContext);

  const [pembelianList, setPembelianList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function pembelian() {
      const data = await getPembelian();

      if(data.error) {
        onOpenMessage(getNotifData(7));
      } else {
        setPembelianList(data.data);
      }  
    }

    pembelian().catch(err => {
      if(err.response?.status === 403) {
        onOpenMessage(getNotifData(8));
      } else {
        onOpenMessage(getNotifData(3));
      }

      navigate('/');
    });
  }, []);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPembelian, setSelectedPembelian] = useState({});
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
    setSelectedPembelian(data);

    setModalTitle('Ubah pembelian ' + data.NamaBarang);
  };
  const handleCloseEdit = () => setOpenEdit(false);


  return (
    <>
      <Grid container direction="column">
        <Grid container sx={{ mb: 1 }}>
          <Typography gutterBottom variant="h4" component="h2">
            Daftar Pembelian
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
                  <TableCell align="center">Nama Supplier</TableCell>
                  <TableCell align="center">Dibeli Oleh</TableCell>
                  <TableCell align="center">Dibeli Pada</TableCell>
                  <TableCell align="center">Satuan</TableCell>
                  <TableCell align="center">Jumlah Pembelian</TableCell>
                  <TableCell align="center">Harga Satuan</TableCell>
                  <TableCell align="center">Nilai Pembelian</TableCell>
                  <TableCell align="center">Aksi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pembelianList.map((pembelian, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{i+1}</TableCell>
                    <TableCell align="left">{pembelian.NamaBarang}</TableCell>
                    <TableCell align="left">{pembelian.NamaSupplier}</TableCell>
                    <TableCell align="left">{pembelian.NamaPengguna}</TableCell>
                    <TableCell align="left">{pembelian.DibeliPada}</TableCell>
                    <TableCell align="left">{pembelian.Satuan}</TableCell>
                    <TableCell align="right">{pembelian.JumlahPembelian}</TableCell>
                    <TableCell align="right">{ribuanSatuan(pembelian.HargaBeli)}</TableCell>
                    <TableCell align="right">{ribuanSatuan(pembelian.NilaiPembelian)}</TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={1}>
                        <IconButton 
                          color="primary" 
                          aria-label="ubah"
                          onClick={() => handleOpenEdit(pembelian)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          color="warning" 
                          aria-label="hapus"
                          onClick={() => handleOpenDelete()}
                        >
                          <DeleteIcon />
                        </IconButton> 
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <PembelianForm   
        type='update'
        open={openEdit} 
        onClose={handleCloseEdit} 
        modalContent={selectedPembelian} 
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
            onClick={async () => {
              try {
                const pembelian = await deletePembelian(data);
          
                if(pembelian.error) {
                  onOpenMessage(getNotifData(6));
                } else {
                  onOpenMessage(getNotifData(2));
                }
              } catch (error) {
                onOpenMessage(getNotifData(3));
              } 

            } }
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