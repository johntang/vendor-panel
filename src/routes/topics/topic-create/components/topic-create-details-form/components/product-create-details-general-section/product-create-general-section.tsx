import { Input } from "@medusajs/ui"
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
    </div>
  )
}
