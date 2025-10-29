import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AddonCategory } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface Props {
  title: string;
  selected: number | undefined;
  setSelected: Dispatch<SetStateAction<number | undefined>>;
  itemCatalog: AddonCategory[];
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
const SingleSelect = ({ title, selected, itemCatalog, setSelected }: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selected ?? ""}
        label={title}
        onChange={(eve) => {
          setSelected(Number(eve.target.value));
        }}
      >
        {/* selected value can be number|undefined so if undefined run None.if
          value contain run itemCatalog */}
        {/*           {selected === undefined && <MenuItem value="">None</MenuItem>}
         */}{" "}
        {itemCatalog.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SingleSelect;
