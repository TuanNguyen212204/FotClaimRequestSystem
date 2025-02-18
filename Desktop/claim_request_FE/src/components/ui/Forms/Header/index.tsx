export interface IHeadProps {
  title: string;
  status: string;
  prepareBy: string;
}
export default function Header({ title, status, prepareBy }: IHeadProps): JSX.Element {
  return (
    <div className="relative pb-5 border-b-1 border-gray-400 mb-5 box-border">
      <h1 className="text-2xl p-0 m-0">{title}</h1>
      <div className="absolute top-1.5 right-0">Claim Status: {status}</div>
      <div className="text-gray-400 mt-2.5">Prepare By : {prepareBy}</div>
    </div>
  );
}
