import { Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
const LoginCarousel = () => {
  const comp: string[] = [];
  for (let i = 0; i < 9; i++) {
    comp.push(
      `https://placehold.co/420x280/${i % 2 ? 'red' : 'blue'}/white?text=${i}`
    );
  }
  return (
    <Carousel
      autoPlay
      infiniteLoop
      interval={10000}
      showStatus={false}
      showThumbs={false}
    >
      {comp.map((item, index) => (
        <Box
          key={'login_carousel' + index}
          sx={{
            width: '420px',
            height: '280px',
            boxSizing: 'border-box',
            background: `url('${item}')`,
            cursor: 'pointer',
          }}
          onClick={() => {
            console.log(item);
          }}
        />
      ))}
    </Carousel>
  );
};
export default LoginCarousel;
