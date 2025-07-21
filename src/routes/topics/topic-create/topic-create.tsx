import { useTranslation } from "react-i18next"
import { RouteFocusModal } from "../../../components/modals"
import { useSalesChannels } from "../../../hooks/api"
import { useStore } from "../../../hooks/api/store"
import { TopicCreateForm } from "./components/topic-create-form"

export const TopicCreate = () => {
  const { t } = useTranslation()

  const { store, isPending: isStorePending } = useStore()

  const { sales_channels, isPending: isSalesChannelPending } =
    useSalesChannels()

  const ready =
    !!store && !isStorePending && !!sales_channels && !isSalesChannelPending

  return (
    <RouteFocusModal>
      <RouteFocusModal.Title asChild>
        <span className="sr-only">{t("products.create.title")}</span>
      </RouteFocusModal.Title>
      <RouteFocusModal.Description asChild>
        <span className="sr-only">{t("products.create.description")}</span>
      </RouteFocusModal.Description>
      {ready && <TopicCreateForm />}
    </RouteFocusModal>
  )
}
