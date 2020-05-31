import { Collapse, IconButton } from "@material-ui/core"; import React, { useState } from "react";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  errorMessage: string
}

export default ({ errorMessage }: IProps) => {
  const [open, setOpen] = useState(true)
  return <Collapse in={open}>
    <Alert
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={() => {
            setOpen(false);
          }}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
    >
      {errorMessage}
    </Alert>
  </Collapse>
}