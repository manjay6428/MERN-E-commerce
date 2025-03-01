import { Input } from "../ui/input";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  isBtnDisabled,
}) => {
  const renderInputsByComponentType = (getControlItem) => {
    const value = formData[getControlItem.name] || "";
    switch (getControlItem.componentType) {
      case "input":
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

      case "textarea":
        return (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );

      case "select":
        return (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className=" w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {" "}
                {/* Wrap options in SelectGroup */}
                {getControlItem?.options?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div className=" flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className=" grid w-full gap-1.5">
            <Label className=" mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button disabled={isBtnDisabled} type="submit" className=" mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
