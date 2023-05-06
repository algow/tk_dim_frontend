import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import WithModal from "../WithModal";
import { useContext, useEffect, useState } from "react";
import { getSupplier, postPembelian } from "../../utils/actions";
import { NotificationContext } from "../../utils/context";
import { getNotifData } from "../../utils/utils";

function PembelianForm(props) {
  const [supplierList, setSupplierList] = useState([]);
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
      const pembelian = await postPembelian(data);

      if(pembelian.error) {
        onOpenMessage(getNotifData(6));
      } else {
        onOpenMessage(getNotifData(2));
      }
    } catch (error) {
      onOpenMessage(getNotifData(3));
    }

    props.onClose();
  };

  useEffect(() => {
    async function supplier() {
      const data = await getSupplier();

      if(data.error) {
        console.log(data.details);
      } else {
        setSupplierList(data.data);
      }  
    }

    supplier().catch(err => {
      console.log(err);
      // onOpenMessage(getNotifData(3));
    });
  }, []);

  const handleChange = (event) => {
    setSelectedSupplier(event.target.value);
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
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="harga_satuan"
          label="Harga Satuan"
          type="number"
          id="harga_satuan"
          autoComplete="harga_satuan"
        />
        <InputLabel>Pilih Supplier</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth
          value={selectedSupplier}
          label="Pilih Supplier"
          onChange={handleChange}
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
          Sign In
        </Button>
      </Box>
    </>
  );
}

export default WithModal(PembelianForm);