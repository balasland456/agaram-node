import { FunctionTypes, ValidatorObject, ValidatorTypes } from "cape-validator";

export const announcementValidatorSchema: ValidatorObject[] = [
  {
    key: "announcementContent",
    type: ValidatorTypes.String,
    validators: [FunctionTypes.required, FunctionTypes.notBlank],
    messages: {
      required: "Announcement Content is required",
      notBlank: "Announcement Content should not be blank",
    },
  },
];
