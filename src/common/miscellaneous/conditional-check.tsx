import { Box, Typography } from '@mui/material';
import CenterBox from './center-box';
import CheckIcon from '@mui/icons-material/Check';

export interface ConditionStepProgress {
  title: string;
  satisfy: boolean;
}
interface Props {
  conditions: ConditionStepProgress[];
}
const ConditionalCheck = ({ conditions }: Props) => {
  return (
    <Box>
      {conditions.map((condition, index) => (
        <CenterBox
          sx={{
            justifyContent: 'left',
            paddingLeft: '1rem',
            '*': {
              color: condition.satisfy ? '#81b64c' : '#9e9d9c',
            },
          }}
          key={`conditional_option${index}:${condition.title}`}
        >
          {condition.satisfy ? (
            <CheckIcon />
          ) : (
            <Box sx={{ width: '24px', height: '24px' }} />
          )}
          {
            <Typography sx={{ paddingLeft: '.5rem' }}>
              {condition.title}
            </Typography>
          }
        </CenterBox>
      ))}
    </Box>
  );
};
export default ConditionalCheck;
