import Table from '@/components/table/Table';
import './Dashboard.scss';
import SearchBar from '@/components/ui/searchbar/SearchBar';
import FilterBar from '@/components/ui/filter-bar/FilterBar';

export default function Dashboard() {
    return (
        <div className='dashboard'>
            <SearchBar />
            <FilterBar />
            <Table />
        </div>
    )
}
