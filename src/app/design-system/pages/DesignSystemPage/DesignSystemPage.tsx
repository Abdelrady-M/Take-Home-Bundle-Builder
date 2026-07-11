import { Button } from "@/components/ui/button";
import { portalAtom } from "@mongez/react-atom";
import { Form } from "@mongez/react-form";
import Drawer from "design-system/components/Drawer";
import {
  DropZoneInput,
  EmailInput,
  FileInput,
  MultiSelectInput,
  SegmentControlInput,
  SelectInput,
  TextareaInput,
  TextInput,
} from "design-system/components/Form";
import PhoneNumberInput from "design-system/components/Form/PhoneNumberInput";
import Modal from "design-system/components/Modal";
import {
  errorToast,
  infoToast,
  successToast,
  toastConfirm,
  toastLoading,
  warningToast,
} from "design-system/components/toast";
import { acceptedImages, acceptedVideo } from "shared/utils";

const group = (label: string, options: string[]) =>
  options.map(option => ({
    group: label,
    value: option,
    label: option,
  }));

const data = [
  ...group("framework", ["React", "Vue", "Angular"]),
  ...group("languages", ["JavaScript", "TypeScript", "Python"]),
];

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
];

const sampleModalPortal = portalAtom("sample");
const sampleDrawerPortal = portalAtom("sample-drawer");

export function SampleModal() {
  return (
    <Modal size="sm" title="Sample Modal" portal={sampleModalPortal}>
      Welcome To our Modal
    </Modal>
  );
}

export function SampleDrawer() {
  return (
    <Drawer direction="bottom" portal={sampleDrawerPortal}>
      Welcome To our Drawer
    </Drawer>
  );
}

const confirm = async () => {
  const result = await toastConfirm(
    "Are you sure?",
    "This action is irreversible",
  );

  console.log({ result });
};

const loading = () => {
  const result = toastLoading("Loading");

  setTimeout(() => {
    result.success("Item has been created successfully");
  }, 2000);
};

export function DesignSystemPage() {
  return (
    <Form className="p-4">
      <PhoneNumberInput
        placeholder="Enter your phone number"
        name="phone"
        required
        label="Phone Number"
      />
      <div className="mb-6" />
      <FileInput
        label="Select Your PHoto"
        name="files"
        accept={[...acceptedImages, ...acceptedVideo]}
      />

      <EmailInput label="email" required name="email" />
      <TextInput
        label="Name"
        required
        name="name"
        placeholder="Enter your name"
      />

      <div className="flex gap-4">
        <SelectInput
          name="test"
          placeholder="Welcome"
          searchable
          label="Select Your Favorite Framework"
          options={data}
        />

        <MultiSelectInput
          name="countries"
          placeholder="Select Countries"
          searchable
          required
          limit={3}
          label="Select Your Favorite countries"
          options={countries}
        />
      </div>

      <TextareaInput label="Bio" name="bio" placeholder="Enter your bio" />

      <div className="my-3 w-1/6">
        <SegmentControlInput data={["React", "Vue", "Angular"]} />
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-1">
          <Button size="sm">SM Button</Button>
          <Button size="default">Default Button</Button>
          <Button size="lg">LG Button</Button>
        </div>

        <div className="flex gap-1">
          <Button variant="ghost" size="sm">
            SM Button
          </Button>
          <Button variant="ghost" size="default">
            Default Button
          </Button>
          <Button variant="ghost" size="lg">
            LG Button
          </Button>
        </div>
        <div className="flex gap-1">
          <Button variant="link" size="sm">
            SM Button
          </Button>
          <Button variant="link" size="default">
            Default Button
          </Button>
          <Button variant="link" size="lg">
            LG Button
          </Button>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm">
            SM Button
          </Button>
          <Button variant="outline" size="default">
            Default Button
          </Button>
          <Button variant="outline" size="lg">
            LG Button
          </Button>
        </div>
        <div className="flex gap-1">
          <Button variant="secondary" size="sm">
            SM Button
          </Button>
          <Button variant="secondary" size="default">
            Default Button
          </Button>
          <Button variant="secondary" size="lg">
            LG Button
          </Button>
        </div>
        <div className="flex gap-1">
          <Button variant="destructive" size="sm">
            SM Button
          </Button>
          <Button variant="destructive" size="default">
            Default Button
          </Button>
          <Button variant="destructive" size="lg">
            LG Button
          </Button>
        </div>
      </div>

      <Button onClick={sampleModalPortal.open}>Open Modal</Button>

      <SampleModal />

      <Button onClick={sampleDrawerPortal.open}>Open Drawer</Button>

      <SampleDrawer />

      <Button onClick={confirm}>Toast Confirm</Button>

      <div className="flex gap-2 my-5">
        <Button
          color="green"
          onClick={() => successToast("Success", "Success Description")}>
          Toast Success
        </Button>
        <Button
          color="red"
          onClick={() => errorToast("Error", "Error Description")}>
          Toast Error
        </Button>
        <Button
          color="blue"
          onClick={() => infoToast("Info", "Info Description")}>
          Toast Info
        </Button>
        <Button
          color="orange"
          onClick={() => warningToast("Warning", "Warning Description")}>
          Toast Warning
        </Button>
        <Button onClick={loading}>Loading Toast</Button>
      </div>

      <DropZoneInput name="files" accept={acceptedImages} />
    </Form>
  );
}
