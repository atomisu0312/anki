export default async function CardViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">カード詳細</h1>
      <p>カードID: {id}</p>
      <p>このページは開発中です。</p>
    </div>
  );
} 