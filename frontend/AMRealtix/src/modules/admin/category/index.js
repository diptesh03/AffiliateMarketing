import SidebarLayout from 'src/common/layouts/SidebarLayout';
import Footer from 'src/common/components/Footer';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Card } from '@mui/material';

const data = [
  {
    "id": 1,
    "is_root": 1,
    "name": "Electronics",
    "children": [
      {
        "id": 2,
        "is_root": 0,
        "name": "Mobiles",
        "children": [
          {
            "id": 6,
            "is_root": 0,
            "name": "Android Phones",
            "children": null
          },
          {
            "id": 7,
            "is_root": 0,
            "name": "Iphones",
            "children": null
          },
          {
            "id": 8,
            "is_root": 0,
            "name": "Feature Phones",
            "children": null
          }
        ]
      },
      {
        "id": 3,
        "is_root": 0,
        "name": "Laptops",
        "children": [
          {
            "id": 4,
            "is_root": 0,
            "name": "Gaming Laptop",
            "children": null
          },
          {
            "id": 5,
            "is_root": 0,
            "name": "All in One PC",
            "children": null
          }
        ]
      }
    ]
  },
  {
    "id": 9,
    "is_root": 1,
    "name": "Fashion",
    "children": [
      {
        "id": 11,
        "is_root": 0,
        "name": "Men",
        "children": [
          {
            "id": 16,
            "is_root": 0,
            "name": "Trouser",
            "children": null
          },
          {
            "id": 17,
            "is_root": 0,
            "name": "Men's shirt ",
            "children": null
          }
        ]
      },
      {
        "id": 12,
        "is_root": 0,
        "name": "Kids",
        "children": [
          {
            "id": 18,
            "is_root": 0,
            "name": "Toys",
            "children": null
          }
        ]
      },
      {
        "id": 10,
        "is_root": 0,
        "name": "Women",
        "children": [
          {
            "id": 13,
            "is_root": 0,
            "name": "Womens Ethnic",
            "children": [
              {
                "id": 19,
                "is_root": 0,
                "name": "Kurti",
                "children": null
              },
              {
                "id": 20,
                "is_root": 0,
                "name": "Salwar",
                "children": null
              }
            ]
          },
          {
            "id": 14,
            "is_root": 0,
            "name": "Saree",
            "children": null
          },
          {
            "id": 15,
            "is_root": 0,
            "name": "Womens Footware",
            "children": null
          }
        ]
      }
    ]
  }
]

function Category() {

  const onAddClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onEditClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const onDeleteClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      style={{ padding: '5px' }}
      nodeId={String(nodes.id)}
      label={
        <>
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <span style={{ marginRight: '50px' }}>{nodes.name}</span>
            <div>
              <span style={{ padding: '2px' }}><AddIcon style={{ fontSize: '15px' }} onClick={onAddClick} /></span>|
              <span style={{ padding: '2px' }}><EditIcon style={{ fontSize: '15px' }} onClick={onEditClick} /></span>|
              <span style={{ padding: '2px' }}><DeleteIcon style={{ fontSize: '15px' }} onClick={onDeleteClick} /></span>
            </div>
          </div>
        </>
      }>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <>
      <Card
        variant="outlined"
        style={{ margin:"30px", paddingTop:"30px", height: '500px', overflow:'auto' }}
      >
        {
          data.map((item)=>
          <TreeView
            style={{ paddingRight: "30px", paddingLeft:"30px" }}
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            {renderTree(item)}
          </TreeView>)
        }
        <Footer />
      </Card>
    </>
  );
}

Category.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Category;
