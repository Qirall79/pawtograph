import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function DeleteModal({
  isOpen,
  onOpenChange,
  action,
  message,
}: {
  isOpen: any;
  onOpenChange: any;
  action: any;
  message: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
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
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
