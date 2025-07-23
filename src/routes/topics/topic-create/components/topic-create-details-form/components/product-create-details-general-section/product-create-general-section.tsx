import { DatePicker, Input, Select } from "@medusajs/ui"
import { UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { Form } from "../../../../../../../components/common/form"
import { ProductCreateSchemaType } from "../../../../types"

type ProductCreateGeneralSectionProps = {
  form: UseFormReturn<ProductCreateSchemaType>
}

export const TopicCreateGeneralSection = ({
  form,
}: ProductCreateGeneralSectionProps) => {
  const { t } = useTranslation()
  return (
    <div id="general" className="flex flex-col gap-y-6">
      <Form.Field
        control={form.control}
        name="name"
        render={({ field }) => {
          return (
            <Form.Item>
              <Form.Label>Name</Form.Label>
              <Form.Control>
                <Input {...field} placeholder="Banner name..." />
              </Form.Control>
            </Form.Item>
          )
        }}
      />

      <Form.Field
        control={form.control}
        name="status"
        render={({ field }) => {
          const handleChange = (value: string) => {
            field.onChange({
              target: {
                name: field.name,
                value: value,
              },
            })
          }

          return (
            <Form.Item>
              <Form.Label>Status</Form.Label>
              <Form.Control>
                <Select
                  onValueChange={(value) => handleChange(value)}
                  value={field.value}
                >
                  <Select.Trigger className="bg-ui-bg-base">
                    <Select.Value placeholder="Select value" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value={"SHOW"}>Show</Select.Item>
                    <Select.Item value={"HIDE"}>Hide</Select.Item>
                  </Select.Content>
                </Select>
              </Form.Control>
            </Form.Item>
          )
        }}
      />

      <Form.Field
        control={form.control}
        name="displaySince"
        render={({ field }) => {
          const handleChange = (value: Date | null) => {
            field.onChange({
              target: {
                name: field.name,
                value: value,
              },
            })
          }

          return (
            <Form.Item>
              <Form.Label>Display Since</Form.Label>
              <Form.Control>
                <DatePicker
                  // onChange={handleChange}
                  // value={field.value}
                  shouldCloseOnSelect={false}
                  {...field}
                />
              </Form.Control>
            </Form.Item>
          )
        }}
      />

      <Form.Field
        control={form.control}
        name="displayUntil"
        render={({ field }) => {
          const handleChange = (value: Date | null) => {
            field.onChange({
              target: {
                name: field.name,
                value: value,
              },
            })
          }

          return (
            <Form.Item>
              <Form.Label>Display Until</Form.Label>
              <Form.Control>
                <DatePicker
                  onChange={handleChange}
                  value={field.value}
                  shouldCloseOnSelect={false}
                />
              </Form.Control>
            </Form.Item>
          )
        }}
      />
    </div>
  )
}
