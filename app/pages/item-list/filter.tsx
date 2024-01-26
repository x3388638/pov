import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Logic } from './interfaces'

interface FilterProps {
  tagList: string[]
  onSelect: (list: string[], logic: Logic) => void
}

interface TagProps {
  selected?: boolean
  label: string
  onClick: () => void
}

interface LogicSelectorProps {
  active?: boolean
  logic: Logic
  onChange: (logic: Logic) => void
}

const Container = styled.div`
  background: #fafafa;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const TagListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const RowContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const Divider = styled.div`
  border-top: 1px solid #eee;
  margin: 4px 0;
`

const Tag: FC<TagProps> = ({ selected = false, label, onClick }) => {
  return (
    <div
      style={{
        padding: '4px 12px',
        borderRadius: '8px',
        background: selected ? '#7ED7C1' : '#f3f3f3',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

const LogicSelector: FC<LogicSelectorProps> = ({
  active = false,
  logic,
  onChange,
}) => {
  return (
    <TagListContainer>
      {['AND', 'OR'].map((l) => (
        <Tag
          key={l}
          selected={active && logic === l}
          label={l === 'AND' ? '交集' : '聯集'}
          onClick={() => active && onChange(l as Logic)}
        />
      ))}
    </TagListContainer>
  )
}

const Filter: FC<FilterProps> = ({ tagList, onSelect }) => {
  const [logic, setLogic] = useState<Logic>('OR')
  const [selectTagList, setSelectedTagList] = useState<string[]>([])
  const [isCollapsed, setIsCollapsed] = useState(true)

  useEffect(() => {
    onSelect(selectTagList, logic)
  }, [logic, selectTagList])

  const handleSelectTag = (tag: string, select: boolean) => {
    if (select) {
      setSelectedTagList([...selectTagList, tag])
    } else {
      setSelectedTagList(selectTagList.filter((t) => t !== tag))
    }
  }

  const handleChangeLogic = (logic: Logic) => {
    setLogic(logic)
  }

  const toggleCollapse = () => {
    setIsCollapsed((val) => !val)
  }

  return (
    <Container>
      <div
        style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }}
        onClick={toggleCollapse}
      >
        <FontAwesomeIcon icon={isCollapsed ? faCaretDown : faCaretUp} />
      </div>
      {!isCollapsed && (
        <>
          <RowContainer>
            <span>分類</span>
            <TagListContainer>
              {tagList.map((tag) => {
                const isSelected = selectTagList.includes(tag)
                return (
                  <Tag
                    key={tag}
                    selected={isSelected}
                    label={tag}
                    onClick={() => handleSelectTag(tag, !isSelected)}
                  />
                )
              })}
            </TagListContainer>
          </RowContainer>
          <Divider />
          <RowContainer>
            <span>條件</span>
            <LogicSelector
              active={selectTagList.length > 1}
              logic={logic}
              onChange={handleChangeLogic}
            />
          </RowContainer>
        </>
      )}
    </Container>
  )
}

export default Filter
