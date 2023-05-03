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

export default function Barang() {
  const [barangList, setBarangList] = useState([]);

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
    <Grid container spacing={4}>
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
                <Button size="small" variant="outlined">Jual</Button>
                :
                null
              }
              {
                (hakAkses.beli.includes(akses))
                ?
                <Button size="small" variant="outlined">Beli</Button>                :
                null
              }
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}