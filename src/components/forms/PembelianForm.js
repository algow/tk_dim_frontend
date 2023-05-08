import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import WithModal from "../WithModal";
import { useContext, useEffect, useState } from "react";
import { getSupplier, postPembelian, updatePembelian } from "../../utils/actions";
import { NotificationContext } from "../../utils/context";
import { getNotifData } from "../../utils/utils";

function PembelianForm(props) {  
  const [supplierList, setSupplierList] = useState([]);

  const [currJumlah, setCurrJumlah] = useState('');
  const [currHarga, setCurrHarga] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState('');

  const {onOpenMessage} = useContext(NotificationContext);

  const handleSubmit = async (event) => {
    const idBarang = props.data?.IdBarang;

    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const data = {
      jumlah: fd.get('jumlah'),
      harga_satuan: fd.get('harga_satuan'),
      id_barang: parseInt(idBarang),
      id_supplier: parseInt(selectedSupplier)
    };

    try {
      let pembelian = {};

      if(props.type === 'create') {
        pembelian = await postPembelian(data);
      } else if (props.type === 'update') {
        const IdPembelian = props.data?.IdPembelian;
        data['id_pembelian'] = parseInt(IdPembelian);
        pembelian = await updatePembelian(data);
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
    if(props.type === 'update') {
      setCurrJumlah(props.data?.JumlahPembelian)
      setCurrHarga(props.data?.HargaBeli)  
      setSelectedSupplier(props.data.IdSupplier);
    }

    async function supplier() {
      const data = await getSupplier();

      if(data.error) {
        onOpenMessage(getNotifData(3));
      } else {
        setSupplierList(data.data);
      }  
    }

    supplier().catch(err => {
      onOpenMessage(getNotifData(3));
    });
  }, [onOpenMessage, props.data?.HargaBeli, props.data.IdSupplier, props.data?.JumlahPembelian, props.type]);

  const handleChange = (event, type) => {
    const actions = {
      jumlah: (e) => setCurrJumlah(e.target.value),
      harga: (e) => setCurrHarga(e.target.value),
      supplier: (e) => setSelectedSupplier(e.target.value),
    }

    actions[type](event);
  };

  return(
    <>
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
          onChange={(event) => handleChange(event, 'jumlah')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="harga_satuan"
          label="Harga Satuan"
          value={currHarga}
          type="number"
          id="harga_satuan"
          autoComplete="harga_satuan"
          autoFocus
          onChange={(event) => handleChange(event, 'harga')}
        />
        <InputLabel>Pilih Supplier</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth
          value={selectedSupplier}
          label="Pilih Supplier"
          onChange={(event) => handleChange(event, 'supplier')}
        >
          {
            supplierList.map( (supplier, i) => {
              return (
                <MenuItem key={i} value={supplier.IdSupplier}>{supplier.NamaSupplier + ' - ' + supplier.KeteranganSupplier}</MenuItem>
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

export default WithModal(PembelianForm);