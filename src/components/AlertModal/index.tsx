import { AlertDialog, Button, Center } from "native-base";
import { InterfaceAlertDialogProps } from "native-base/lib/typescript/components/composites/AlertDialog/types";
import { ColorSchemeType } from "native-base/lib/typescript/components/types";
import React from "react";

interface AlertModalProps extends InterfaceAlertDialogProps {
  loading: boolean;
  isOpen: boolean;
  loadingMessage: string;
  title?: string;
  confirmLabel: string;
  declineLabel: string;
  confirmCallback: () => void;
  declineCallback: () => void;
  bodyMesage: string;
  confirmColorScheme?: ColorSchemeType
}

const AlertModal = ({
  bodyMesage, loadingMessage, loading, isOpen, confirmCallback, declineCallback, confirmLabel, declineLabel, title, confirmColorScheme, ...rest
}: AlertModalProps) => {

  return (
    <AlertDialog isOpen={isOpen} {...rest} >
      <AlertDialog.Content>
        {/* <AlertDialog.CloseButton /> */}
        <AlertDialog.Header>{title}</AlertDialog.Header>
        <AlertDialog.Body>
          {bodyMesage}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={() => declineCallback()}>
              {declineLabel}
            </Button>
            <Button isLoadingText={loadingMessage} isLoading={loading} colorScheme={confirmColorScheme} onPress={() => confirmCallback()}>
              {confirmLabel}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
};

export default AlertModal