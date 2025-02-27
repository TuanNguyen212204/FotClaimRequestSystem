import FilledButtonModal from "@components/common/modal/FilledButtonModal";
import ConfirmModalSignOut from "@components/common/modal/ConfirmModalSignOut";
import ImageModal from "@components/common/modal/ImageModal";
import LinkModal from "@components/common/modal/LinkModal";
import SwitchesModal from "@components/common/modal/SwitchesModal";

function ModalTest() {
  return (
    <div>
      <h2>React Modal Examples</h2>
      <FilledButtonModal />
      <ConfirmModalSignOut />
      <ImageModal />
      <LinkModal />
      <SwitchesModal />
    </div>
  );
}

export default ModalTest;
