import { Heading } from "@medusajs/ui"
import { UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { ProductCreateSchemaType } from "../../types"
import { TopicCreateGeneralSection } from "./components/product-create-details-general-section"
import { TopicCreateMediaSection } from "./components/product-create-details-media-section"

type ProductAttributesProps = {
  form: UseFormReturn<ProductCreateSchemaType>
}

export const TopicCreateDetailsForm = ({ form }: ProductAttributesProps) => {
  // const { getFormFields } = useDashboardExtension()
  // const fields = getFormFields("product", "create", "general")

  return (
    <div className="flex flex-col items-center p-16">
      <div className="flex w-full max-w-[720px] flex-col gap-y-8">
        <Header />
        <div className="flex flex-col gap-y-6">
          <TopicCreateGeneralSection form={form} />
          <TopicCreateMediaSection form={form} />
        </div>
      </div>
    </div>
  )
}

const Header = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col">
      <Heading>{t("products.create.header")}</Heading>
    </div>
  )
}
