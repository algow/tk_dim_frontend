import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import WithModal from "../WithModal";
import { useContext, useEffect, useState } from "react";
import { getPelanggan, postPenjualan } from "../../utils/actions";
import { NotificationContext } from "../../utils/context";
import { getNotifData } from "../../utils/utils";

function PenjualanForm(props) {
  const [pelangganList, setPelangganList] = useState([]);
  const [selectedPelanggan, setSelectedPelanggan] = useState('');

  const {onOpenMessage} = useContext(NotificationContext);

  const handleSubmit = async (event) => {
    const idBarang = props.data?.IdBarang;

    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data = {
      jumlah: fd.get('jumlah'),
      harga_satuan: fd.get('harga_satuan'),
      id_barang: parseInt(idBarang),
      id_pelanggan: parseInt(selectedPelanggan)
    };

    try {
      let pembelian = {};

      if(props.type === 'create') {
        pembelian = await postPenjualan(data);
      } else if (props.type === 'update') {
        //
      } else {
        pembelian['error'] = true;
      }

      if(pembelian.error === false) {
        onOpenMessage(getNotifData(2));
      } else {
        onOpenMessage(getNotifData(6));
      }
    } catch (error) {
      onOpenMessage(getNotifData(3));
    }

    props.onClose();
  };

  useEffect(() => {
    if(props.data?.IdPelanggan) {
      setSelectedPelanggan(props.data.IdPelanggan);
    }

    async function pelanggan() {
      const data = await getPelanggan();

      if(data.error) {
        console.log(data.details);
      } else {
        setPelangganList(data.data);
      }  
    }

    pelanggan().catch(err => {
      // console.log(err);
      onOpenMessage(getNotifData(3));
    });
  }, []);

  const handleChange = (event) => {
    setSelectedPelanggan(event.target.value);
  };


  return(
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="jumlah"
          label="Jumlah Penjualan"
          name="jumlah"
          type="number"
          autoComplete="jumlah"
          value={props.data?.JumlahPenjualan}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="harga_satuan"
          label="Harga Satuan"
          value={props.data?.HargaJual}
          type="number"
          id="harga_satuan"
          autoComplete="harga_satuan"
        />
        <InputLabel>Pilih Pelanggan</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth
          value={selectedPelanggan}
          label="Pilih Pelanggan"
          onChange={handleChange}
        >
          {
            pelangganList.map( (pelanggan, i) => {
              return (
                <MenuItem key={i} value={pelanggan.IdPelanggan}>{pelanggan.NamaPelanggan + ' - ' + pelanggan.KeteranganPelanggan}</MenuItem>
              )
            })
          }
        </Select>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
}

export default WithModal(PenjualanForm);