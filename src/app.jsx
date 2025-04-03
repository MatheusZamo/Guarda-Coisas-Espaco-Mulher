import { useItems } from "./hooks/use-items"
import { Logo } from "./components/logo/logo"
import { FormAddItem } from "./components/form-add-item/form-add-item"
import { ListOfItems } from "./components/list-of-items/list-of-items"
import { Filters } from "./components/filters/filters"
import { Stats } from "./components/stats/stats"

const App = () => {
  const {
    items,
    orderBy,
    handleSubmitForm,
    handleClickClearList,
    handleClickDelete,
    handleClickCheck,
    handleChangeOrder,
  } = useItems()

  return (
    <>
      <Logo />
      <FormAddItem onSubmitItem={handleSubmitForm} />
      <ListOfItems
        orderBy={orderBy}
        items={items}
        onClickCheck={handleClickCheck}
        onClickDelete={handleClickDelete}
      />
      <Filters
        orderBy={orderBy}
        onChangeOrder={handleChangeOrder}
        onClickClearList={handleClickClearList}
      />
      <Stats items={items} />
    </>
  )
}

export { App }
