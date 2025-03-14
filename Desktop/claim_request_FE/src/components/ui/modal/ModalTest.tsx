import FilledButtonModal from "@components/ui/modal/FilledButtonModal";
import ConfirmModalSignOut from "@components/ui/modal/ConfirmModalSignOut";
import ImageModal from "@components/ui/modal/ImageModal";
import LinkModal from "@components/ui/modal/LinkModal";
import SwitchesModal from "@components/ui/modal/SwitchesModal";
import ConfirmModal from "@components/ui/modal/ConfirmModal";

function ModalTest() {
  return (
    <div>
      <h2>React Modal Examples</h2>
      <FilledButtonModal />
      <ConfirmModalSignOut />
      <ImageModal />
      <LinkModal />
      <SwitchesModal />
      <ConfirmModal />
    </div>
  );
}

export default ModalTest;
