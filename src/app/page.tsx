import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getSucculents } from '@/actions/succulent-actions';
import { Stack } from '@mui/material';
import { SucculentCard } from '@/components/SucculentCard/SucculentCard';
import { SucculentCreateButton } from '@/components/SucculentForm/SucculentCreateButton';

const Home = async () => {
  const { data: succulents } = await getSucculents();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Sucudex
        </Typography>
        <Typography variant="body1">
          As 151 originais!
        </Typography>

        <SucculentCreateButton />

        <Box sx={{ width: '100%' }}>
          <Stack spacing={2}>
            {succulents?.map((succulent) => (
              // Passamos o objeto inteiro. O TypeScript valida se bate com o tipo do Prisma.
              <SucculentCard key={succulent.id} data={succulent} />
            ))}
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
