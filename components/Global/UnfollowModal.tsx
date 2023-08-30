import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function UnfollowModal({
  isOpen,
  onOpenChange,
  action,
  message,
  button,
}: {
  isOpen: any;
  onOpenChange: any;
  action: any;
  message: string;
  button: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm unfollow
              </ModalHeader>
              <ModalBody>{message}</ModalBody>
              <ModalFooter>
                <Button
                  isDisabled={isLoading}
                  color="default"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={async () => {
                    setIsLoading(true);
                    await action();
                    setIsLoading(false);
                    onClose();
                  }}
                  isLoading={isLoading}
                >
                  {button}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
