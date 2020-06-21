import { Trans } from "@lingui/macro"
import React from "react"
import { useHistory } from "react-router-dom"
import { DropdownContainer, DropdownHeader } from "../Dropdown"
import { IPaginatorProps } from "./Paginator.types"

interface IPaginatorDropdownMenuProps extends IPaginatorProps {
  close: () => void
}

const PaginatorDropdownMenuProps: React.FC<IPaginatorDropdownMenuProps> = ({
  close,
  page,
  url,
}) => {
  const [state, setState] = React.useState("")
  const history = useHistory()

  return (
    <form
      onSubmit={(event) => {
        if (page) {
          let number = Number.parseInt(state)
          if (isNaN(number)) number = page.number
          if (number < 1) number = 1
          if (number > page.pagination.pages) {
            number = page.pagination.pages
          }

          if (number !== page.number) {
            history.push(url(number))
          }
        }

        close()
        event.preventDefault()
        return false
      }}
    >
      <DropdownHeader
        text={<Trans id="paginator.goto">Go to page</Trans>}
      />
      <DropdownContainer>
        <div className="paginator-goto">
          <input
            className="form-control form-control-sm"
            type="number"
            max={page ? page.pagination.pages : 1}
            min="1"
            step="1"
            value={state}
            onChange={({ target }) => setState(target.value)}
          />
          <button className="btn btn-sm btn-primary">
            <Trans id="go">Go</Trans>
          </button>
        </div>
      </DropdownContainer>
    </form>
  )
}

export default PaginatorDropdownMenuProps
