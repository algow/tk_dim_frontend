import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getBarang } from '../utils/actions';
import { getUserData } from '../utils/utils';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Divider } from '@mui/material';
import ModalComponent from '../components/WithModal';
import PembelianForm from '../components/PembelianForm';


export default function Barang() {
  // const initialPembelianModalData = {
  //   title: 'Rekam Pembelian',
  //   suppliers: [],
  //   id_barang: null,
  //   nama_barang: ''
  // };

  const [barangList, setBarangList] = useState([]);
  const [openBeli, setOpenBeli] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState({});
  const [modalTitle, setModalTitle] = useState('');

  const handleOpenBeli = (data) => {
    setOpenBeli(true);
    setSelectedBarang(data);

    setModalTitle('Rekam pembelian ' + data.NamaBarang);
  };
  const handleCloseBeli = () => setOpenBeli(false);

  useEffect(() => {
    async function barang() {
      const data = await getBarang();

      if(data.error) {
        console.log(data.details);
      } else {
        setBarangList(data.data);
      }  
    }

    barang().catch(err => {
      console.log(err);
      // onOpenMessage(getNotifData(3));
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
          {barangList.map((barang, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: '56.25%',
                  }}
                  image="https://source.unsplash.com/random"
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
                    (hakAkses.jual.includes(akses))
                    ?
                    <Button 
                      size="small" 
                      variant="outlined" 
                      color="success" 
                      startIcon={<RemoveCircleIcon />}
                    >
                      Jual
                    </Button>
                    :
                    null
                  }
                  {
                    (hakAkses.beli.includes(akses))
                    ?
                    <Button 
                      size="small" 
                      variant="outlined" 
                      startIcon={<AddCircleIcon />}
                      onClick={() => handleOpenBeli(barang)}
                    >
                      Beli
                    </Button>
                    :
                    null
                  }
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <PembelianForm open={openBeli} onClose={handleCloseBeli} modalContent={selectedBarang} title={modalTitle} />
    </>
  )
}