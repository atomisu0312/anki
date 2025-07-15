import { getCardViewModel } from '@/actions/card/new/viewmodel';
import CardTemplate from '@/components/templates/card/sample/CardTemplate';

const NewCardPage = async () => {
  const viewModel = await getCardViewModel();
  
  if (!viewModel) {
    return <div>エラーが発生しました。</div>;
  }

  return (
    <div>
      <CardTemplate viewModel={viewModel} />
    </div>
  );
};

export default NewCardPage;