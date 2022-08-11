import FooterComponent from "../../components/common/FooterComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import SearchPostComponent from "../../components/common/post/SearchPostComponent";

const Index = () => (
  <div>
    <HeaderComponent />
    <SearchPostComponent />
    <FooterComponent page="search" />
  </div>
);

export default Index;
