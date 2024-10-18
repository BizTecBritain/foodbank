"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

export interface DisclosureProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: () => void;
  isControlled: boolean;
  getButtonProps: (props?: any) => any;
  getDisclosureProps: (props?: any) => any;
}

export interface AskYesNoProps {
  disclosure: DisclosureProps;
  isCancellable?: boolean;
  title: string;
  children: React.ReactNode;
  onSubmit: (result: boolean) => any;
}

export interface CustomComponentProps {
  disclosure: DisclosureProps;
  onSubmit: (result: boolean) => any;
}

export default function AskYesNo({
  disclosure,
  isCancellable = false,
  title,
  children,
  onSubmit,
}: AskYesNoProps) {
  return (
    <Modal
      hideCloseButton={!isCancellable}
      isDismissable={isCancellable}
      isKeyboardDismissDisabled={!isCancellable}
      isOpen={disclosure.isOpen}
      placement="center"
      onOpenChange={disclosure.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() => {
                  onSubmit(true);
                  onClose();
                }}
              >
                Yes
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  onSubmit(false);
                  onClose();
                }}
              >
                No
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
