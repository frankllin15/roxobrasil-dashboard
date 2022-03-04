import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface IMultipleSelectProps {
  options: Array<{
    name: string;
    value: string;
  }>;

  selectedOption: string[];
  setSelectedOption?: React.Dispatch<React.SetStateAction<string[]>>;
  handleChange: any;
  label: string;
}

export const MultipleSelectChip: React.FC<IMultipleSelectProps> = ({
  options,
  selectedOption,
  setSelectedOption,
  handleChange,
  label,
}) => {
  const theme = useTheme();

  // const handleChange = (event: SelectChangeEvent<string[]>) => {
  //   const {
  //     target: { value },
  //   } = event;

  //   setSelectedOption(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  return (
    <>
      <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        sx={{
          minWidth: "10rem",
        }}
        name="collection"
        value={selectedOption}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={label} />}
        renderValue={(selected) => (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              // alignContent: "center",
              gap: 0.5,
            }}
          >
            {options
              .filter((option) =>
                selectedOption.some((value) => option.value == value)
              )
              .map(({ name }, key) => (
                <Chip key={key} label={name} />
              ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            style={getStyles(option.value, selectedOption, theme)}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
