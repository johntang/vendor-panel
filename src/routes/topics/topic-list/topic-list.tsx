import { SingleColumnPage } from "../../../components/layout/pages"
import { useDashboardExtension } from "../../../extensions"
import { TopicListTable } from "./components/product-list-table"

export const TopicList = () => {
  const { getWidgets } = useDashboardExtension()

  return (
    <SingleColumnPage
      widgets={{
        after: getWidgets("product.list.after"),
        before: getWidgets("product.list.before"),
      }}
    >
      <TopicListTable />
    </SingleColumnPage>
  )
}
