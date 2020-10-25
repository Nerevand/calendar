import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect, { NativeSelectProps } from '@material-ui/core/NativeSelect';
import { useTranslation } from "react-i18next";


export interface NativeSelectsProps extends NativeSelectProps {
  data: string[]
  handleChange: any
  value: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

export default function NativeSelects(props: NativeSelectsProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { data, handleChange, value } = props;

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="custom-dropdown">{t("period")}</InputLabel>
        <NativeSelect
          value={value}
          onChange={handleChange}
          inputProps={{
            name: 'name',
            id: 'custom-dropdown',
          }}
        >
          {
            data.map((i: string) => (
              <option key={i} value={i}>{t(`select.${i}`)}</option>
            ))
          }
        </NativeSelect>
      </FormControl>
    </div>
  );
}
