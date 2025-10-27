import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
interface Props {
  title: string;
  selected: number[];
  setSelected: Dispatch<SetStateAction<number[]>>;
  itemCatalog: Menu[] | MenuCategory[];
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const MultiSelect = ({ title, selected, itemCatalog, setSelected }: Props) => {
  return (
    <FormControl>
      <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
      <Select
        multiple
        value={selected}
        onChange={(eve) => {
          const selectedId = eve.target.value as number[];
          setSelected(selectedId);
        }}
        renderValue={() => {
          const selectedItemCatalogs = selected.map(
            (itemId) =>
              itemCatalog.find((item) => item.id === itemId) as
                | MenuCategory
                | Menu
          );
          return selectedItemCatalogs.map((item) => item.name).join(", ");
        }}
        input={<OutlinedInput label={title} />}
        MenuProps={MenuProps}
      >
        {itemCatalog.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            <Checkbox checked={selected.includes(item.id)} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
