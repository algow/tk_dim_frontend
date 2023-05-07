import { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getBarang } from '../utils/actions';
import { getNotifData, getUserData } from '../utils/utils';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Divider } from '@mui/material';
import PembelianForm from '../components/forms/PembelianForm';
import PenjualanForm from '../components/forms/PenjualanForm';
import { NotificationContext } from '../utils/context';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RekomForm from '../components/forms/RekomForm';


export default function Barang() {
  const {onOpenMessage} = useContext(NotificationContext);

  const [barangList, setBarangList] = useState([]);
  const [openRekom, setOpenRekom] = useState(false);
  const [openBeli, setOpenBeli] = useState(false);
  const [openJual, setOpenJual] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState({});
  const [modalTitle, setModalTitle] = useState('');

  const handleOpenRekom = (data) => {
    setOpenRekom(true);
    setSelectedBarang(data);

    setModalTitle('Rekomendasi pembelian ' + data.NamaBarang);
  };
  const handleCloseRekom = () => setOpenRekom(false);

  const handleOpenBeli = (data) => {
    setOpenBeli(true);
    setSelectedBarang(data);

    setModalTitle('Rekam pembelian ' + data.NamaBarang);
  };
  const handleCloseBeli = () => setOpenBeli(false);

  const handleOpenJual = (data) => {
    setOpenJual(true);
    setSelectedBarang(data);

    setModalTitle('Rekam penjualan ' + data.NamaBarang);
  };
  const handleCloseJual = () => setOpenJual(false);

  useEffect(() => {
    async function barang() {
      const data = await getBarang();

      if(data.error) {
        onOpenMessage(getNotifData(7));
      } else {
        setBarangList(data.data);
      }  
    }

    barang().catch(err => {
      onOpenMessage(getNotifData(3));
    });
  }, []);

  const akses = getUserData()['NamaAkses'];
  const hakAkses = {
    jual: ['admin', 'manajer_penjualan', 'staf_penjualan'],
    beli: ['admin', 'manajer_pengadaan', 'staf_pengadaan']
  }

  return (
    <>
      <Grid container direction="column">
        <Grid container sx={{ mb: 1 }}>
          <Typography gutterBottom variant="h4" component="h2">
            Daftar Barang
          </Typography>
        </Grid>
        
        <Divider variant="middle" />

        <Grid container spacing={4} sx={{ mt: 1 }}>
          {barangList.map((barang, i) => {
            const pic = require('../assets/' + barang.Gambar);

            return (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '5%',
                    }}
                    image={pic}
                    alt={barang.NamaBarang}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {barang.NamaBarang}
                    </Typography>
                    <Typography>
                      {barang.Keterangan}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  {
                      (hakAkses.beli.includes(akses))
                      ?
                      <>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          color="warning"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleOpenRekom(barang)}
                        >
                          Rekomendasi
                        </Button>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          startIcon={<AddCircleIcon />}
                          onClick={() => handleOpenBeli(barang)}
                        >
                          Beli
                        </Button>
                      </>
                      :
                      null
                    }
                    {
                      (hakAkses.jual.includes(akses))
                      ?
                      <Button 
                        size="small" 
                        variant="outlined" 
                        color="success" 
                        startIcon={<RemoveCircleIcon />}
                        onClick={() => handleOpenJual(barang)}
                      >
                        Jual
                      </Button>
                      :
                      null
                    }
                  </CardActions>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </Grid>

      <PembelianForm 
        type='create'
        open={openBeli} 
        onClose={handleCloseBeli} 
        modalContent={selectedBarang} 
        title={modalTitle} 
      />

      <PenjualanForm 
        type='create'
        open={openJual} 
        onClose={handleCloseJual} 
        modalContent={selectedBarang} 
        title={modalTitle} 
      />

      <RekomForm
        type='create'
        open={openRekom} 
        onClose={handleCloseRekom} 
        modalContent={selectedBarang} 
        title={modalTitle} 
      />
    </>
  )
}