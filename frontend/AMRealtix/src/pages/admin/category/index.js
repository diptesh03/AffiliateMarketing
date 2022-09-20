import SidebarLayout from 'src/common/layouts/SidebarLayout';
import CategoryModule from 'src/modules/admin/category';


function Category() {

    return(
      <CategoryModule />
    )
}

Category.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Category;
