import SidebarLayout from 'src/common/layouts/SidebarLayout';
import ChangePasswordModule from 'src/modules/_auth/component/change-password/ChangePassword';


function Category() {

    return(
      <ChangePasswordModule />
    )
}

Category.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default Category;
